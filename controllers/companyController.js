const Job = require('../models/job');
const Company = require('../models/company');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
});

const getName = async (req, res, next) => {
    const { id } = req;
    try {
        const foundCompanyName = await Company.findById(id)
            .select('name')
            .exec();
        if (!foundCompanyName) return res.status(401).json({ 'message': 'unauthorized' });

        res.json(foundCompanyName);
    }
    catch (err) {
        next(err);
    }
}

const getJobs = async (req, res, next) => {
    const { id } = req;
    try {
        const foundCompany = await Company.findById(id).exec();
        if (!foundCompany) return res.status(401).json({ 'message': 'unauthorized' });

        const foundPostedJobs = await Job.find({ company: id })
            .select('jobTitle experience endDate')
            .exec();

        res.json(foundPostedJobs);
    }
    catch (err) {
        next(err);
    }
}

const getJobProfile = async (req, res, next) => {
    const { jobId } = req.params;
    try {
        const foundJob = await Job.findById(jobId).exec();
        if (!foundJob) return res.status(404).json({ 'message': 'Job info not found' });

        res.json({
            job: foundJob,
        });
    }
    catch (err) {
        next(err);
    }
}

const getCompany = async (req, res, next) => {
    const { id } = req;
    try {
        const foundCompany = await Company.findById(id)
            .select('username name industry website mobile email address overview emailVerified mobileVerified')
            .exec();
        if (!foundCompany) return res.status(401).json({ 'message': 'unauthorized' });

        res.json(foundCompany);
    }
    catch (err) {
        next(err);
    }
}

const postNewJob = async (req, res, next) => {
    const { id } = req;
    const { jobTitle, jobDescription, experience, addCandidate, endDate } = req.body;
    if (!jobTitle || !jobDescription || !addCandidate || !experience || !endDate) return res.status(400).json({ 'message': 'All fields required' });
    try {
        const foundCompany = await Company.findById(id).exec();
        if (!foundCompany) return res.status(401).json({ 'message': 'unauthorized' });
        if ((foundCompany.mobileVerified&&foundCompany.emailVerified) ===false)return res.status(401).json({ 'message': 'Please verify to post jobs' });
        const query = await Job.create({
            jobTitle,
            jobDescription,
            addCandidate,
            experience,
            endDate: new Date(endDate),
            company: id
        });

        foundCompany.jobs = [...foundCompany.jobs, query._id]
        await foundCompany.save();

        addCandidate.forEach(async candidate => {
            const mailOptions = {
                from: process.env.MAIL,
                to: candidate,
                subject: 'Job offer',
                html: `<p>You have been offered a job<br />
                            Job Details:<br />
                            Company name : ${foundCompany.name}<br />
                            Title : ${jobTitle}<br />
                            Description : ${jobDescription}<br />
                            Experience: ${experience}<br />
                            Sender : ${foundCompany.email}<br />
                            End date : ${endDate}<br />
                            </p>`
            };

            try {
                await transporter.sendMail(mailOptions);
            }
            catch (err) {
                next(err)
            }
        });

        res.status(201).json({ 'success': 'Job created' });
    }
    catch (err) {
        next(err);
    }
}

const putCompany = async (req, res, next) => {
    const { id } = req;
    const { name, industry, email, website, address, mobile, overview } = req.body;
    if (!name || !industry || !email || !website || !address || !mobile || !overview) return res.status(400).json({ 'message': 'All fields required' });
    try {
        const foundCompany = await Company.findById(id).exec();
        if (!foundCompany) return res.status(401).json({ 'message': 'unauthorized' });

        foundCompany.name = name;
        foundCompany.industry = industry;
        foundCompany.email = email;
        foundCompany.website = website;
        foundCompany.address = address;
        foundCompany.mobile = mobile;
        foundCompany.overview = overview;

        await foundCompany.save();

        res.status(201).json({ 'success': 'Company details updated' });
    }
    catch (err) {
        next(err);
    }
}

const deleteJob = async (req, res, next) => {
    const { id } = req;
    const { jobId } = req.params;
    if (!jobId) return res.status(400).json({ 'message': 'All fields required' });
    try {
        const foundCompany = await Company.findById(id).exec();
        if (!foundCompany) return res.status(401).json({ 'message': 'unauthorized' });
        if (!foundCompany.jobs.includes(jobId)) return res.status(401).json({ 'message': 'unauthorized' });

        const query = await Job.findByIdAndDelete(jobId).exec();

        res.json({ 'success': 'Job deleted' });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getName,
    getJobs,
    getJobProfile,
    getCompany,
    postNewJob,
    putCompany,
    deleteJob
}
const express = require('express');
const router = express.Router();
const imageGenerationQueue = require('../../queqe');
const QueueModel = require('../../models/Queue');
const Stripe = require('stripe')
const stripe = Stripe('YOUR_SECRET_KEY')

// Queue processing logic should be defined separately and only once.
imageGenerationQueue.process(async (job, done) => {
    const { image, queueEntryId } = job.data;

    try {
        await QueueModel.findByIdAndUpdate(queueEntryId, { status: 'processing' });
        // Logic to generate the image...
        const generatedImageLink = '...';  // Replace '...' with actual logic to generate the image.
        setTimeout(async () => {
            await QueueModel.findByIdAndUpdate(queueEntryId, {
                status: 'completed',
                generatedImageLink,
                completedAt: Date.now()
            })
            done();
            console.log('123')
        }, 10000)

    } catch (error) {
        console.error("Failed to process job:", error);
        await QueueModel.findByIdAndUpdate(queueEntryId, { status: 'failed' });
    }
});


router.post('/generate-image', async (req, res) => {
    const { prompt, image, user, ip } = req.body;
    const queueEntry = new QueueModel({
        userId: user,
        ip: ip,
        originalImageLink: image
    });
    try {
        await queueEntry.save();

        await imageGenerationQueue.add({
            image,
            queueEntryId: queueEntry._id
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to save to database or add job to the queue." });
    }

    res.json({ id: queueEntry._id, originalImageLink: queueEntry.originalImageLink, status: queueEntry.status });
});


router.post('/images', async (req, res) => {
    console.log('sdfsdfsdf', req.body)
    QueueModel.findOne({ ip: req.body.ip })
        .then(user => {
            console.log('user', user)
            if (user === null) {
                res.json({ disable: false })
                return
            }
            if ((!req.body.userId) && (user)) {
                res.json({ disable: true })
                return;
            }
            if (req.body.userId) {
                res.json({ disable: false })
            }
        })
})




module.exports = router;

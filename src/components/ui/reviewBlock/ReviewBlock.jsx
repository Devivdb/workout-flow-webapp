import './ReviewBlock.css'

function ReviewBlock() {
    const reviews = [
        {
            rating: 5,
            content: "WorkoutFlow transformed my fitness routine! The muscle visualization tool helps me target exactly what I need, and I love being able to export my workouts to track progress. Best fitness app I've used in years!",
            author: "Marcus T."
        },
        {
            rating: 5,
            content: "As a personal trainer, I recommend WorkoutFlow to all my clients. The ability to customize sets and reps for each exercise makes creating personalized programs so much easier. My clients love the PDF export feature!",
            author: "Sophia K."
        },
        {
            rating: 5,
            content: "I was intimidated by gym workouts until I found WorkoutFlow. The exercise finder helped me discover beginner-friendly options, and I've gained so much confidence. Three months in and I'm seeing real results!",
            author: "Jamie W."
        },
        {
            rating: 5,
            content: "The muscle visualization feature is a game-changer! I can finally see exactly which muscles I'm working and build balanced routines. No more overtraining some areas while neglecting others.",
            author: "Raj P."
        },
        {
            rating: 5,
            content: "WorkoutFlow helped me break through my plateau. The ability to filter exercises by equipment type let me design home workouts during lockdown, and I've maintained my gains without a gym membership.",
            author: "Elena M."
        },
        {
            rating: 5,
            content: "As someone who travels frequently for work, the ability to export my routines as PDFs has been invaluable. I can pull up my workout anywhere, even without internet access. Perfect for my lifestyle!",
            author: "David C."
        },
        {
            rating: 5,
            content: "The interface is so intuitive! I can quickly build workouts, adjust my sets and reps, and track what I'm doing. No more scribbling notes on my phone or trying to remember my last workout.",
            author: "Aisha N."
        },
        {
            rating: 5,
            content: "I've been using this workout builder for a few weeks now, and I love how customizable it is! I can adjust sets, reps, rest time, and even add my own exercises. It's perfect for tailoring my workouts to my fitness goals.",
            author: "Anonymous"
        }
    ];

    return (
        <>
            <div className="outer-container-wrapper-review">
                {reviews.map((review, index) => (
                    <div className="review" key={index}>
                        <div className="stars">
                            {"★".repeat(review.rating)}
                        </div>
                        <p className="review-content">{review.content}</p>
                        <p className="reviewer-name">- {review.author}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReviewBlock;
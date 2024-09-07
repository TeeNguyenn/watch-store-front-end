class FeedbackModel {
    feedbackId: number;
    rate?: number;
    comment?: string;



    constructor(feedbackId: number,
        rate: number,
        comment: string,
    ) {
        this.feedbackId = feedbackId;
        this.rate = rate;
        this.comment = comment;

    }

}

export default FeedbackModel;
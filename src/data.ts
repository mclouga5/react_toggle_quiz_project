export interface Gradient { // a single gradient option
    gradient: string;
}

export interface Answer {
    label: string;
    value: number;
}

export interface QuestionAnswerSet {
    question: string;
    answerList: Answer[][];
}

export const gradients: Gradient[] = [
    { gradient: 'linear-gradient(to top, #ee6e2e, #f5b465)' }, // wrong
    { gradient: 'linear-gradient(to top, #e9826b, #f0b294)' }, // closer
    { gradient: 'linear-gradient(to top, #5acbd8, #75dfc2)' }, // right
];

export const questionsList: QuestionAnswerSet[] = [
    {
        question: 'Aoife will make an amazing next hire because she...',
        answerList: [[
            { label: "is a great GAA player", value: 0.5 },
            { label: "works well in a team", value: 1 },
        ],
        [
            { label: "bakes almost as good as she codes", value: 0 },
            { label: "is a quick learner", value: 1 },
            { label: "puts the fun in functional programming", value: 0.5 },
        ],
        [
            { label: "has a cute dog", value: 0 },
            { label: "has ambition and drive", value: 1 },
            { label: "is really fun", value: 0.5 },
        ]]
    },

    {
        question: 'Should we hire Aoife?',
        answerList: [[
            { label: "Obviously", value: 1 },
            { label: "Hmm", value: 0 },
            { label: "Possibly", value: 0.5 },
        ],
        [
            { label: "Unsure", value: 0 },
            { label: "Certainly", value: 1 },
            { label: "I guess?", value: 0.5 },
        ],
        [
            { label: "We'll see", value: 0 },
            { label: "Probably", value: 0.5 },
            { label: "Absolutely", value: 1 },
        ]]
    },
];
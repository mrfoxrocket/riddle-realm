export type Riddle = {
    id?: string;
    question?: string;
    difficulty?: string;
    allSolved?: boolean;
};

export type RiddleFormProps = {
    riddleId: string | undefined;
    hintsUsed: number;
    answerShown: boolean;
    inputValue: string;
    handleInputChange: (e) => void;
};

export type DifficultySelectProps = {
    difficulty: string;
    handleDifficultyChange: (e) => void;
};

export type CenterInputProps = {
    inputValue: string;
    handleInputChange: (e) => void;
};

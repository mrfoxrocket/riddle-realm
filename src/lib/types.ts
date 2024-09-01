export type Riddle = {
    id?: string;
    question?: string;
    difficulty?: string;
    allSolved?: boolean;
};

export type RiddleFormProps = {
    riddleId: string;
    hintsUsed: number;
    answerShown: boolean;
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type DifficultySelectProps = {
    difficulty: string;
    handleDifficultyChange: (value: string) => void;
};

export type CenterInputProps = {
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

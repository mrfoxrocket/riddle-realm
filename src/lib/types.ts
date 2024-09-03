export type Riddle = {
    id?: string;
    question?: string;
    difficulty?: string;
    allSolved?: boolean;
};

export type ExampleRiddle = {
    id: string;
    question: string;
    answer: string;
};

export type RiddleFormProps = {
    riddleId: string;
    hintsUsed: number;
    answerShown: boolean;
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    riddleResult: boolean;
    setRiddleResult: (result: boolean) => void;
};

export type DifficultySelectProps = {
    difficulty: string;
    handleDifficultyChange: (value: string) => void;
};

export type CenterInputProps = {
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type BottomTextProps = {
    answer?: string;
    riddleAllSolved?: boolean | undefined;
    hintAllUsed: boolean;
    difficulty?: string;
    handleNewRiddle: (difficulty: string) => void;
    handleGetAnswer?: () => void;
    handleGetHint: () => void;
    answerDisabled?: boolean;
};

export type SignUpFormProps = {
    riddleId: string;
    hintsUsed: number;
};

interface VoteButtonPropType {
    value: string | number | undefined;
    onClick: (value: string) => void;
    className?: string;
}

export default VoteButtonPropType;
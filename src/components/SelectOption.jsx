// Simple component for dropdown options - makes them look consistent
function SelectOption({ value, label }) {
    return (
        <option value={value} className="appearance-none bg-primary-bg">
            {label}
        </option>
    );
}

export default SelectOption;

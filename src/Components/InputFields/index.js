import CustomDropdown from "./Dropdown/Dropdown";
import CustomInput from "./Input/Input";
import ChecksInput from "./Input/ChecksInput";

export const InputFields = {
    TextInput: CustomInput,
    PasswordInput: CustomInput,
    RadioInput: ChecksInput,
    CheckboxInput: ChecksInput,
    Dropdown: CustomDropdown
}
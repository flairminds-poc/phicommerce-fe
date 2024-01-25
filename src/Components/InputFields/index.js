import CustomDropdown from "./Dropdown/Dropdown";
import CustomInput from "./Input/Input";
import ChecksInput from "./Input/ChecksInput";
import RadioInput from "./Input/RadioInput";

export const InputFields = {
    TextInput: CustomInput,
    PasswordInput: CustomInput,
    RadioInput: RadioInput,
    CheckboxInput: ChecksInput,
    Dropdown: CustomDropdown
}
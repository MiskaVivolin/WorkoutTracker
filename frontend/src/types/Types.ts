import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./utilTypes";

export type AuthenticationValidationProps = {
    navigation: StackNavigationProp<RootStackParamList>;
    mode: string;
    setValidationInit: (data: boolean) => void;
    validationFields: ValidationFields;
    setValidationErrors: React.Dispatch<React.SetStateAction<ValidationFields>>;
    setValidationFields: (data: ValidationFields) => void;
    setValidUsername?: (data: boolean) => void;
    setValidPassword?: (data: boolean) => void;
    isFirstRender?: boolean;
}
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '../../context/ThemeContext';
import { userSignup } from '../../services/userSignup';
import { SignupContainerProps } from '../../types/componentProps';
import { Themes } from '../../../assets/styles/Themes';
import { useForm } from 'react-hook-form';
import Button from "../Button";

const SignupContainer = ({navigation}: SignupContainerProps) => {

    type SignupFormData = z.infer<typeof signupSchema>;
    const signupSchema = z.object({
      username: z.string().min(4, 'Username must be at least 4 characters'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
    });
    const { theme } = useTheme();
    const { register, handleSubmit, setValue, watch, clearErrors, setError, formState: { errors } } = useForm<SignupFormData>({
      resolver: zodResolver(signupSchema),
      defaultValues: { username: '', password: '' }
    });
  
    const onSubmit = async (data: SignupFormData) => {
      try {
        const response = await userSignup(navigation, data.username, data.password)
        if (response === "This username is already taken") {
          setError("username", {
            type: "manual",
            message: response
          })
        }
      } catch (err) {
        console.error("Signup onSubmit error:", err)
      }
    };

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>
            <Text style={[styles.labelHeader, { color: Themes[theme].defaultText }]}>Create a new account</Text>
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Username</Text>
              <TextInput
                style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
                {...register('username')}
                value={watch('username')}
                onChangeText={(text) => {
                  setValue('username', text)
                  clearErrors('username')
                }}
              />
              {errors.username && (
                <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>
                  {errors.username.message}
                </Text>
              )}
    
              <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Password</Text>
              <TextInput 
                style={[styles.inputField, { color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border }]}
                secureTextEntry
                {...register('password')}
                value={watch('password')}
                onChangeText={(text) => {
                  setValue('password', text)
                  clearErrors('password')
                }}
              />
              {errors.password && (
                <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>
                  {errors.password.message}
                </Text>
              )}
            </View>
    
            <View style={{ flexDirection: 'row' }}>
              <Pressable style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={[styles.labelLink, { color: Themes[theme].defaultText }]}>Back</Text>
              </Pressable>
              <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fieldContainer: {
        justifyContent: 'center',
        maxWidth: Dimensions.get('window').width < 370 ? 270 : 350,
        marginBottom: 50,
    },
    label: {
        fontSize: 13,
        fontFamily: 'MerriweatherSans',
        marginBottom: 2,
    },
    labelHeader: {
        fontSize: 24,
        fontFamily: 'MerriweatherSans',
        marginBottom: 100,
    },
    inputFieldError: {
        fontSize: 13,
        fontFamily: 'MerriweatherSans',
        marginBottom: 10,
    },
    labelLink: {
        fontSize: 15,
        fontFamily: 'MerriweatherSans',
        fontWeight: '500',
    },
    inputField: {
        fontFamily: 'MerriweatherSans',
        fontSize: 12,
        height: 35,
        width: Dimensions.get('window').width < 370 ? 270 : 350,
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 8,
        borderRadius: 3,
    },
    backButton: {
        width: 155,
        paddingVertical: 15,
        paddingLeft: 25,
        marginRight: 90,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default SignupContainer
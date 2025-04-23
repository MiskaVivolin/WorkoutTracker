import { Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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
    <View style={[styles.signupContainer, { backgroundColor: Themes[theme].background }]}>
      <Text style={[styles.header, { color: Themes[theme].defaultText }]}>Create a new account</Text>
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

      <View style={styles.buttonContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={[styles.labelLink, { color: Themes[theme].defaultText }]}>Back</Text>
        </Pressable>
        <Button 
          title="Sign up" 
          onPress={handleSubmit(onSubmit)} 
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? '80%' : 350,
  },
  fieldContainer: {
    justifyContent: 'center',
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? '100%' : 350,
    marginBottom: 50,
  },
  buttonContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    marginBottom: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500',
    fontFamily: 'MerriweatherSans',
    marginBottom: Platform.OS === 'android' || Platform.OS === 'ios' ? 60 : 100,
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
    fontSize: 13,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: Dimensions.get('window').height < 1000 ? 8 : 12,
    paddingHorizontal: 8,
    ...Platform.select({
      android: {
        paddingBottom: 8,
        lineHeight: 15,
      },
      default: {
        height: 35,
      },
    }),
  },
  backButton: {
    width: 155,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignupContainer
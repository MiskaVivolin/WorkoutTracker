import { Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { useUserToken } from '../../context/UserTokenContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLogin } from "../../services/userLogin";
import { z } from 'zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContainerProps } from 'types/componentProps';
import { useForm } from 'react-hook-form';
import Button from "../Button";
import { Themes } from '../../../assets/styles/Themes';

const LoginContainer = ({navigation}: LoginContainerProps) => {

    type LoginFormData = z.infer<typeof loginSchema>;
    const loginSchema = z.object({
      username: z.string().min(1, "Username is required"),
      password: z.string().min(1, "Password is required"),
    });
    const { setToken } = useUserToken();
    const { theme } = useTheme();
    const { register, handleSubmit, setValue, watch, clearErrors, setError, formState: { errors } } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: { username: "", password: "" }
    });
  
    const onSubmit = async (data: LoginFormData) => {
      try {
        const response = await userLogin(navigation, data.username, data.password)
        if(response === "Invalid username or password") {
          setError("password", {
            type: "manual",
            message: response
          })
        } else {
          setToken(data.username);
        }
      } catch (err) {
        console.error("Login onSubmit error:", err)
      }
    };
  
    useEffect(() => {
      const autoLogin = async () => {
        try {
          const storedUserJSON = await AsyncStorage.getItem("userInputFields")
          if (storedUserJSON) {
            const storedUser = JSON.parse(storedUserJSON);
            if (storedUser) {
              setValue("username", storedUser.username);
              setValue("password", storedUser.password);
              await onSubmit(storedUser)
            }
          }
        } catch(err) {
          console.error("Auto login error:", err)
        }
      }
      autoLogin()
    }, []);


  return (
    <View style={[styles.loginContainer, { backgroundColor: Themes[theme].background }]}>
      <Text style={[styles.title, { color: Themes[theme].defaultText }]}>
        Log in to your account
      </Text>


      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Username</Text>
        <TextInput style={[ styles.inputField, { backgroundColor: Themes[theme].inputField, color: Themes[theme].defaultText, borderColor: Themes[theme].border}]}
          {...register('username')}
          onChangeText={(text) => {
            setValue('username', text)
            clearErrors('username')
            }}
          value={watch('username')}
          />
        {errors.username && (
          <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>
            {errors.username.message}
          </Text>
        )}

        <Text style={[styles.label, { color: Themes[theme].defaultText }]}>Password</Text>
        <TextInput
          style={[styles.inputField, { backgroundColor: Themes[theme].inputField, color: Themes[theme].defaultText, borderColor: Themes[theme].border}]}
          secureTextEntry
          {...register('password')}
          onChangeText={(text) => {
            setValue('password', text)
            clearErrors('password')
          }}
          value={watch('password')}
          />
        {errors.password && (
          <Text style={[styles.inputFieldError, { color: Themes[theme].errorText }]}>
            {errors.password.message}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.accountButton} onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={[styles.labelLink, { color: Themes[theme].defaultText }]}>
            Sign up
          </Text>
        </Pressable>
        <Button 
          title="Log in" 
          onPress={handleSubmit(onSubmit)} 
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
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
  title: {
    fontSize: 22,
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
  accountButton: {
    width: 155,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginContainer
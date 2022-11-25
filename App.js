import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PacientesProvider from './src/providers/PacientesProvider';
import Home from './src/views/private/Home';
import Login from './src/views/auth/Login';
import Registro from './src/views/auth/Registro';
import OlvidePassword from './src/views/auth/OlvidePassword';
import Perfil from './src/views/private/Perfil';
import UpdatePerfil from './src/views/private/UpdatePerfil';
import UpdatePassword from './src/views/private/UpdatePassword';
import SearchPacientes from './src/views/private/SearchPacientes';
import { colorContainer, colorWhite } from './src/styles/colors';

const Stack = createStackNavigator();

const encabezadoStyles = {
  headerStyle: {
    backgroundColor: colorContainer,
  },
  headerTintColor: colorWhite,
  headerTitleStyle: {
    color: colorWhite,
    fontWeight: '900',
  },
  headerTitleAlign: 'center',
};

const App = () => {
  return (
    <PacientesProvider>
      <NavigationContainer
        theme={{
          colors: {
            background: colorContainer,
            border: '#404040',
          },
        }}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            presentation: 'transparentModal',
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Iniciar Sesión',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{
              title: 'Crear Cuenta',
              ...encabezadoStyles,
            }}
          />
          <Stack.Screen
            name="OlvidePassword"
            component={OlvidePassword}
            options={{
              title: 'Recuperar Contraseña',
              ...encabezadoStyles,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{
              title: 'Mis Datos',
              ...encabezadoStyles,
            }}
          />
          <Stack.Screen
            name="UpdatePerfil"
            component={UpdatePerfil}
            options={{
              title: 'Actualizar Perfil',
              ...encabezadoStyles,
            }}
          />
          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePassword}
            options={{
              title: 'Cambiar Contraseña',
              ...encabezadoStyles,
            }}
          />
          <Stack.Screen
            name="SearchPacientes"
            component={SearchPacientes}
            options={{
              title: 'Buscar Pacientes',
              ...encabezadoStyles,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PacientesProvider>
  );
};

export default App;

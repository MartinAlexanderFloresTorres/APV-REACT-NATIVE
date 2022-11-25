import { StyleSheet } from 'react-native';
import {
  colorContainer,
  colorInput,
  colorInputText,
  colorPrimary,
  colorWhite,
} from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorContainer,
  },
  box: {
    backgroundColor: colorContainer,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  titulo: {
    textAlign: 'center',
    color: colorWhite,
    fontSize: 35,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 34,
  },
  tituloBold: {
    color: colorPrimary,
    fontWeight: '900',
    fontSize: 50,
  },
  input: {
    backgroundColor: colorInput,
    color: colorInputText,
    width: '100%',
    marginBottom: 26,
    borderRadius: 5,
    padding: 14,
    fontSize: 18,
  },
  btn: {
    backgroundColor: colorPrimary,
    width: '100%',
    padding: 14,
    borderRadius: 5,
    marginBottom: 26,
  },
  btnText: {
    color: colorWhite,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  text: {
    color: colorWhite,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnBold: {
    color: colorPrimary,
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default globalStyles;

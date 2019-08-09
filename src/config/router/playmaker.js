import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from '../../screen/Main';
import LKaryawan from '../../screen/Karyawan/List';
import DKaryawan from '../../screen/Karyawan/Detail';
import Login from '../../screen/Auth/Login';

const AppNavigator = createStackNavigator( //Digunakan untuk fungsi Back yang bisa kembali ke halaman sebelumnya
    {
      Main,
      LKaryawan,
      DKaryawan,
      Login
    },
    {
      initialRouteName: "Main",
      headerMode: "none",
    }
  );
  
export default AppContainer = createAppContainer(AppNavigator); //Digunakan untuk membuat Container
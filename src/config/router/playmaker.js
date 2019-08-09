import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from '../../screen/Main';
import LKaryawan from '../../screen/Karyawan/List';
import DKaryawan from '../../screen/Karyawan/Detail';
import Login from '../../screen/Auth/Login';
import AKaryawan from '../../screen/Karyawan/Add';

const AppNavigator = createStackNavigator( //Digunakan untuk fungsi Back yang bisa kembali ke halaman sebelumnya
    {
      Main,
      LKaryawan,
      DKaryawan,
      Login,
      AKaryawan
    },
    {
      initialRouteName: "Main",
      headerMode: "none",
    }
  );
  
export default AppContainer = createAppContainer(AppNavigator); //Digunakan untuk membuat Container
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';

// logo button

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
// import config from 'config';
// import Logo from 'ui-component/Logo';
// import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  // const dispatch = useDispatch();
  return (
    <ButtonBase>
      {/* <Logo /> */}
    </ButtonBase>
  );
};

export default LogoSection;

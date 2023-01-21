import { useState } from 'react';

const usePage = () => {
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);

  const handleShowAlert = () => {
    setIsAlertShown(true);
  };

  const handleHideAlert = () => {
    setIsAlertShown(false);
  };

  const handleShowForm = () => {
    setIsFormShown(true);
  };

  const handleHideForm = () => {
    setIsFormShown(false);
  };

  return {
    isFormShown,
    isAlertShown,
    onShowAlert: handleShowAlert,
    onHideAlert: handleHideAlert,
    onShowForm: handleShowForm,
    onHideForm: handleHideForm,
  };
};

export default usePage;

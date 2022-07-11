const loginForm = {

  nameErrorHandler: (name: string, customError: string) => {
    if (customError.length > 0) return customError;
    if (name.length === 0) return 'Please enter a name.';
    if (name.length >= 20) return 'Please enter less then 20 characters.';
    return '';
  },

  formatInputName: (name: string) => {
    return name.split(' ').join('-').toLowerCase();
  }

};

export default loginForm;

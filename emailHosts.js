module.exports = {
    starsandstripesdriving: {
      email: "STARSANDSTRIPESDRIVING_EMAIL",
      password: "STARSANDSTRIPESDRIVING_PASSWORD",
      template: {
        sudject: "Customer Request",
        body: (params) => {
          const {name, message, contact} = params;
          return `
            Hi,
  
            My name is ${name}
  
            ${message}
  
            You can reach me at ${contact}
          `
        }
      }
    },
    blakio: {
      emailENV: "BLAKIO_EMAIL",
      passwordENV: "BLAKIO_PASSWORD",
      template: {
        sudject: "Customer Request",
        body: (params) => {
          const {
            name,
            message,
            contact
          } = params;
  
          return `
            Hi,
  
            My name is ${name}
  
            ${message}
  
            You can reach me at ${contact}
          `
        }
      }
    }
  }
  
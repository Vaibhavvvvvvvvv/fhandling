import React from 'react';
import { Provider } from 'react-redux';
import Form from './component/Form';
import store from './Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

export default App;



// import React from 'react'
// const App = () => {
//   function handleForm (e) {
//     e.preventDefault()
//     let form = e.target;
//     let formData = new FormData(form)
//     let data = Object.fromEntries(formData.entries())
//     console.log(data)
//   }
//   return (
//     <div>
// <form onSubmit={handleForm}> 
//   <input type='email' name="email" placeholder='email'/>
//   <input type='password' name="password" placeholder='password'/>
//   <button type='submit'>submit</button>
//   </form>
//     </div>
//   )
// }

// export default App

// import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
// import { createContext } from 'react';

// type ChildProps = {
//   age: number;
//   dom:JSX.Element;
// }


// function Child({ age, dom} : ChildProps) {
//   return (
//     <>
//     <div>{age.toString()}</div>
//     {dom}
//     </>
//   )
// }

// function App() {
//   const dom = <div>dom</div>
//   return (
//     <div>
//       <Child age={2232} dom={dom}/>
//     </div>
//   );
// }

// export default App;



// type User = {
//   name?:string
// }


// function App() {

//   const [ user, setUser ] = useState<User | null>({})

//   return (
//     <div>
//       <button onClick={()=>{ setUser( {name: 'less'}) }}> button </button>
//       <div>{user?.name}</div>
//     </div>
//   );
// }

// export default App;

/// ****************

// type ActionType = {
//   type:'Add'
// }

// const initialState = {
//   count: 0
// }

// function reducer(state:typeof initialState ,action:ActionType) {
//   const newState = {...state};


//   if (action.type === 'Add') {
//     newState.count = state.count + 1; 
//   }

//   return newState;
// }



// function App() {

//   const [ state, dispatch ] = useReducer(reducer, initialState)

//   return (
//     <div>
//       <button onClick={()=>{ 
//         dispatch( {type: 'Add'});
//        }}>Add</button>
//       <div>{state.count}</div>
//     </div>
//   );
// }

// export default App;


/// **********




// function App() {

//   const ref = useRef<HTMLDivElement>(null!);

//   function handleClick() {
//     console.log(ref.current.innerHTML);
//   }

//   return (
//     <div ref={ref} onClick={handleClick}>
//       hello
//     </div>
//   );
// }

// export default App;


/// **********


// function App() {

//   const ref = useRef<number | null>(null);

//   useEffect(() => {
//     ref.current = window.setTimeout(()=>{
//       console.log('timer');
//     }, 1000);
//     return clearTimeout(ref.current);
//   },[])

//   return (
//     <div>
//       1212
//     </div>
//   );
// }

// export default App;


/// **********



// type genderType = {
//   value:'male' | 'female';
// }

// const GenderContext = createContext<genderType>({value:'male'});


// const ChildComponent = () => {
//   const gender = useContext(GenderContext);
//   return <div>Dell is {gender.value}</div>
// }

// function App() {

//   const [ gender, setGender ] = useState<genderType>({value:'male'});

//   return (
//     <GenderContext.Provider value={gender}>
//       <button onClick={()=> { setGender({value:'female'}) }}> button </button>
//       <ChildComponent/>
//     </GenderContext.Provider>
//   );
// }

// export default App;


/// **********


// function App() {

//   // function handleClick(e:React.MouseEvent) {
//   //   console.log(e.currentTarget.innerHTML);
//   // }

//   function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
//     console.log(e.target.value);
//   }

//   return (
//     // <div onClick={handleClick}>hello</div>
//     <input onChange={handleChange}/>
//   );
// }

// export default App;


/// **********
import { HashRouter, Route, Routes } from 'react-router-dom';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'normalize.css'
import './styles/base.css'
import './styles/border.css'
import Guide from './containers/Guide';
import Login from './containers/Login';

function App() {
  return (
    <HashRouter>
      <Routes>
       <Route path='/' element={<Guide/>} />
       <Route path='/login' element={<Login/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
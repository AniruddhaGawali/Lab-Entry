import React, {useState} from 'react'
import TeacherLogin from './teacher_login'
import AdminPage from './admin_login'
{}
const Login = ({setIsLogin}) => {

    const [isTeacherLogin, setIsTeacherLogin] = useState(true);

  return(
    <>
       <main className="relative bg-primary w-screen h-screen flex flex-col items-center justify-center">
       <button
            type="button"
            className="absolute top-10 right-10 text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm mx-2"
            onClick={() => setIsTeacherLogin(!isTeacherLogin)}
          >
            <span className="text-white font-bold">
             {
                    !isTeacherLogin ? "Teacher Login" : "Admin Login"
             }
            </span>
          </button>

        {isTeacherLogin ? (
            <TeacherLogin setIsLogin={setIsLogin} />
        ) : (
            <AdminPage setIsLogin={setIsLogin} />
        )}
       </main>
    </>
  )
}

export default Login
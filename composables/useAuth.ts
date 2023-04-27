import { useToast } from "primevue/usetoast";

export const useAuth = () => {
    const toast = useToast()
    const http = useHttpRequest()
    const current_location = useCookie('current_location');
    const loading = ref(false)
    return {
        headers: () => ({ Authorization: `token dsfsdfs` }),
        loading,
        login(email, passord, isStudent): void {
            loading.value = true
            http.fetch("login", { method: 'post',body: {email: email, password: passord,isStudent: isStudent?1:0}}).then((data: any) => {
                console.log(data)
                if (data.status == 200) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('logger', JSON.stringify(data.data))
                    
                    // navigateTo(current_location.value??"/dashboard")
                    if(isStudent){
                        localStorage.setItem('userType', '1')
                        window.location.href = '/students/'+data.data.ID 
                    }else{
                        window.location.href = '/dashboard'
                        localStorage.setItem('userType', '0')
                    }
                    console.log("login succeed")
                }
            }).catch((data)=> {
                toast.removeGroup('login')
                  toast.add({severity:'error', summary: 'Login error', detail:data.data.message, life: 3000, group: 'login'});
            }).finally(()=>loading.value = false)
        },
        checkLoginStatus: () => http.fetch("verifyToken").then((data: any) => {
            if (data.status == 200) {
                navigateTo(current_location.value ?? "/dashboard")
                console.log("login succeed")
            }
        }).catch(() => { navigateTo({path:'/auth/login'}) })
    }
}
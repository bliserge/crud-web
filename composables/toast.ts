import { useToast } from "primevue/usetoast";

export const toast= () =>  {
    const toasts = useToast()
    return {
        responseMessage(message,type = 'success', life=3000): void {
            toasts.add({ severity: type, summary: type=='success'?'Congratularations !':'Error occurred', detail: message, life: life });
        }
    }
  
}
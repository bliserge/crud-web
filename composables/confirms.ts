import { useConfirm } from "primevue/useconfirm";

export const confirms= () =>  {
  const confirms = useConfirm()
    return {
        deleteConfirm(event,item,key,deleteCallback): void {
        const message = item[key] ? item[key]: item
            confirms.require({
                target: event.currentTarget,
              message: `Do you want to delete ${message}?`,
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                accept: () => {
                  deleteCallback(item);
                },
                reject: () => {
                },
              });
        }
    }
}
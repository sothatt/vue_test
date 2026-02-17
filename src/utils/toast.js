

import router from "@/router";
import { toast } from 'vue3-toastify';

export const nofity = {
  success(text, location) {
    return toast.success(text,{
         autoClose: 1000,
        position: "bottom-right",
        onClose: ()=>{
            router.push(location)
        },
    })
  },
  error(text){
    return toast.error(text,{
      autoClose: 1000,
      position: "bottom-right"
    })
  }
};


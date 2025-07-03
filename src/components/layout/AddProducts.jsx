import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "react-toastify"
import { addProduct } from "@/constants/services"

const AddProductModal = ({ onAdded }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [open, setOpen] = useState(false)


  const onSubmit = async (data) => {
    try {
      const newProduct = await addProduct(data)
      onAdded(newProduct) 
      toast.success("Mahsulot muvaffaqiyatli qo‘shildi!")
      reset()
      setOpen(false)
    } catch (error) {
      toast.error("Xatolik yuz berdi!")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Mahsulot Qo‘shish</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yangi Mahsulot Qo‘shish</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="title">Nomi</Label>
            <Input id="title" placeholder="Mahsulot nomi" {...register("title", { required: true })} />
            {errors.title && <span className="text-red-500 text-sm">Nomini kiriting</span>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Tavsif</Label>
            <Textarea id="description" placeholder="Mahsulot haqida" {...register("description")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="avatar">Rasm URL</Label>
            <Input id="avatar" placeholder="https://..." {...register("avatar", { required: true })} />
            {errors.avatar && <span className="text-red-500 text-sm">Rasm URL kerak</span>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Yuborilmoqda..." : "Qo‘shish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductModal

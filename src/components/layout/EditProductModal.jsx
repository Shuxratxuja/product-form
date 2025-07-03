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
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { updateProduct } from "@/constants/services"
import { Plus } from "@/assets/icons/Plus"

const EditProductModal = ({ product, onUpdated }) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()

  useEffect(() => {
    if (open && product) {
      reset({
        title: product.title,
        description: product.description,
        avatar: product.avatar,
      })
    }
  }, [open, product, reset])

  const onSubmit = async (data) => {
    try {
      const updatedProduct = await updateProduct(product.id, data)
      onUpdated(updatedProduct) 
      setOpen(false)
      toast.success("Mahsulot muvaffaqiyatli yangilandi!")
    } catch (error) {
      toast.error("Xatolik yuz berdi!")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mahsulotni Tahrirlash</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Nomi</Label>
            <Input id="title" {...register("title", { required: true })} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Tavsif</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="avatar">Rasm URL</Label>
            <Input id="avatar" {...register("avatar", { required: true })} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductModal

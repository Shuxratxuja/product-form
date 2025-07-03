import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import EditProductModal from './EditProductModal'
import { toast } from 'react-toastify'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { deleteProduct } from '@/constants/services'
import { Delete } from '@/assets/icons/Delete'

const ProductCards = ({ product, onDeleted, onUpdated }) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id)
      onDeleted(product.id) 
      toast.success("Mahsulot o‘chirildi")
    } catch (err) {
      toast.error("O‘chirishda xatolik yuz berdi!")
    }
  }

  return (
    <Card className="p-3 space-y-2">
      <img
        className="h-[250px] rounded-md w-full object-cover"
        src={product.avatar}
        alt={product.title}
      />
      <CardTitle>{product.title}</CardTitle>
      <CardDescription className="line-clamp-2">
        {product.description}
      </CardDescription>

      <div className="flex gap-4">
        <EditProductModal
          product={product}
          onUpdated={onUpdated} 
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center gap-2">
              <Delete />
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Rostdan ham o‘chirmoqchimisiz?</AlertDialogTitle>
              <AlertDialogDescription>
                Bu amalni bekor qilib bo‘lmaydi. Mahsulot butunlay o‘chiriladi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                O‘chirish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  )
}

export default ProductCards

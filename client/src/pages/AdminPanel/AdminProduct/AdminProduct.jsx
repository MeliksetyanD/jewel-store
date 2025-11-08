// /* eslint-disable react/prop-types */

// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { deleteProductAdmin, getProductsAdmin } from '../../../store/adminSlice'
// import styles from './AdminProduct.module.css'
// const AdminProduct = ({ product }) => {
// 	const dispatch = useDispatch()
// 	const deleteHandle = () => {
// 		dispatch(deleteProductAdmin(product.uid))
// 		setTimeout(() => {
// 			dispatch(getProductsAdmin())
// 		}, 2000)
// 	}
// 	return (
// 		<div className={styles.item}>
// 			<img src={product.images[0]} alt='img' className={styles.img} />
// 			<p>{product.name}</p>
// 			<p>{product.price}</p>
// 			<div className={styles.buttons}>
// 				<Link
// 					to={`/admin/home/update/${product.uid}`}
// 					className={styles.button + ' ' + styles.update}
// 				>
// 					Update
// 				</Link>
// 				<button
// 					className={styles.button + ' ' + styles.delete}
// 					onClick={deleteHandle}
// 				>
// 					Delete
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// export default AdminProduct




/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductAdmin, getProductsAdmin } from '../../../store/adminSlice'
import styles from './AdminProduct.module.css'

const AdminProduct = ({ product }) => {
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = useState(false)

  const onDelete = async () => {
    const ok = window.confirm(`Удалить товар "${product.name}"?`)
    if (!ok) return
    try {
      setIsDeleting(true)
      await dispatch(deleteProductAdmin(product.uid))
      await dispatch(getProductsAdmin())
    } finally {
      setIsDeleting(false)
    }
  }

  const cover = product.images?.[0]
  const price = formatPrice(product.price)

  return (
    <article className={styles.card} aria-busy={isDeleting}>
      <div className={styles.thumbWrap}>
        {cover ? (
          <img src={cover} alt={product.name} className={styles.thumb} />
        ) : (
          <div className={styles.thumbEmpty}>No image</div>
        )}
        {product.forSlide && <span className={styles.badge}>Slide</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title} title={product.name}>{product.name}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>{price}</span>
          {product.count != null && (
            <span className={styles.count} title='Доступно'>
              {product.count} шт
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <Link
            to={`/admin/home/update/${product.uid}`}
            className={`${styles.btn} ${styles.update}`}
            aria-label={`Изменить ${product.name}`}
          >
            Update
          </Link>
          <button
            type='button'
            className={`${styles.btn} ${styles.delete}`}
            onClick={onDelete}
            disabled={isDeleting}
            aria-label={`Удалить ${product.name}`}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  )
}

function formatPrice(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return value ?? ''
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 2 }).format(num)
}

export default AdminProduct


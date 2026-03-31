import React from 'react'
import Button from '../../components/Button.jsx'

function PurchaseOrderForm({handleSubmit}){

    const onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
    }
}
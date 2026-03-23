'use server'
import {pool} from './db';
import {refreshSession} from '../auth-client'
export async function setRole(role,userId){
  try {
    await pool.query(`UPDATE "user" SET "activeRole" = $1, "onboardingComplete" = $2 WHERE "id" = $3`,[role, true, userId]);
    await refreshSession();
    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false, message: 'Failed to set role.'}
  }
}

export async function addRequest(formData,userId){
  try {
    await pool.query(
    `INSERT INTO requests (restaurant, drop_off_spot, delivery_contents, confirmation_number, room_floor, tip_amount, requested_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [formData.restaurant, formData.drop_off_spot, formData.delivery_contents, formData.confirmation_number, formData.room_floor, parseFloat(formData.tip_amount), userId]
    )
    return {success: true}
  } catch (error){
    console.error(error)
    return {success: false, message: 'Failed to add a new request.'}
  }
}

export async function cancelRequest(orderId){
  try {
    await pool.query(`UPDATE requests SET status = $1 WHERE id = $2`,['cancelled',orderId])
    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false, message: 'Order cancellation failed.'}
  }
}
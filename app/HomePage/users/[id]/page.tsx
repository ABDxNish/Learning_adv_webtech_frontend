
'use client'
import {use} from 'react'

export default function users({params,}:{params: Promise<{id:string}>})
 {
    const{id}= use(params)
      
    return (
        <>
        <div>
            <table>
        <tbody>
        <tr>
          <td>Plan Name:</td>
          <td><input type="text" name="pname" /></td>
        </tr>

        <tr>
          <td>Ammount:</td>
          <td><input type="text" name="amm" /></td>
        </tr>

     <tr>
          <td>Address:</td>
          <td><input type="text" name="add" /></td>
        </tr>
        </tbody>
        </table>
        <p>hello {id}</p>
        </div>
        
        </>
    );
}
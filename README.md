# Subs Widget

Use Subs in your website has never been easier! Thanks to our React JS Package.

## Installation

First, install the package:

```bash
yarn install subs-widget
```
or

```bash
npm install subs-widget
```

## Usage

Now you just need to import and use our customizable button:

```javascript
import { Subs } from 'subs-widget';

const handleResponse = (response : {success:boolean, message: string}) => {
   console.log("This is what happened" , response);    
}

return(
<Subs address={"0x135B48F76870C2e0d5440dE8F5E7b7A6a7d52720"} 
        appId="40" 
        chain={"mumbai"} 
        color='red'
        width={200}
        defaultPayment='Premium'
        choice={["payment", "token"]}
        dataOnSubs={handleResponse} />
)
```

## How it Works

### Just widget without default payment

```javascript
<Subs address={"0x135B48F76870C2e0d5440dE8F5E7b7A6a7d52720"} 
        appId="40" 
        chain={"mumbai"} 
        dataOnSubs={handleResponse} 
/>
```
<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FNJdz9i9zHd9ZynHcYDvg%252Fimage.png%3Falt=media%26token=773d4d42-c558-4386-b2d1-674e8a7f3179&width=768&dpr=4&quality=100&sign=7a0fc1653ebb5938df90f9bc0834a930e55306d97a1502d89cd9c21985296256" />
</div>


### Widget with default payment

```javascript
<Subs address={"0x135B48F76870C2e0d5440dE8F5E7b7A6a7d52720"} 
        appId="40" 
        chain={"mumbai"} 
        defaultPayment='Premium'
        dataOnSubs={handleResponse} 
/>
```
<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2Fcdn.gamma.app%2Fzjdxhxryph5dzu7%2Fe4bb8404307b4d618a0eff526d052cb4%2Foriginal%2FCapture-d-ecran-du-2023-09-19-09-10-57.png&width=768&dpr=1&quality=100&sign=2ce127538e30e3d51e8eba0512798feda7e7e93c927325e732aa1ecb8c912475" />
</div>


### Widget with default payment and preselected token 

```javascript
<Subs address={"0x135B48F76870C2e0d5440dE8F5E7b7A6a7d52720"} 
        appId="40" 
        chain={"mumbai"} 
        defaultPayment='Premium'
        choice={{
              payment: "Premium",
              token: "0x8e468E7Cbf7E7E056A7591C796F2dd4C5C255591"
        }}
        dataOnSubs={handleResponse} 
/>
```
<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2Fcdn.gamma.app%2Fzjdxhxryph5dzu7%2F872e7fe83bcc4480a4f623f2e1a84930%2Foriginal%2FCapture-d-ecran-du-2023-09-19-10-41-12.png&width=768&dpr=1&quality=100&sign=836f2be6a0a9dde6c10f632035f37943661cc86e047345dff53776e2f9184c35" />
</div>


### Options

You can choose multiple ways to present your button:

- **address**: Address of the owner of the App
- **appId**: App ID
- **chain**: Network of your subscription plan
- **color**: Customize the color of your button
- **width**: Width of the component
- **defaultPayment**: Payment name, if you want to show a particular payment
- **choice**: Payment name and token address, prechoose and only keep the Subscribe button
- **response**: Informs you if a subscription is done successfully.

## Popup

If the Popup doesn't show up, some parts of your CSS may cause some issues.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FARZgxDKQwkoBmJhTq6Ja%252Fimage.png%3Falt=media%26token=7afadffc-c590-4289-9418-bcbc9abe2f63&width=768&dpr=4&quality=100&sign=83d34a8efd1eba62be982bbf744b457bbd0d51b4c5bbf7ad2139bd8464c14707" />
</div>

### First view of the Popup

First, you need to accept our terms and conditions by checking the check box.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252Fy6XMK0Ov2fA1M2naIuTz%252Fimage.png%3Falt=media%26token=331e6056-fd65-40b0-b17d-fa5ae00a01dc&width=768&dpr=4&quality=100&sign=938de54f7d866e370c7c4d40c25e45b03ea85b125e77271a5a00310895293282" />
</div>

### Approval Step

Users will need to approve an amount of token before the subscription. We will later debit the amount with TransferFrom calls periodically.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FyDMy64lp3ApdWteJdBFx%252Fimage.png%3Falt=media%26token=a891cde7-018d-4693-8771-3651c1fa02de&width=768&dpr=4&quality=100&sign=bf71b82dee9eb2ab3a2d5d24773b2e79b3f930433539d205df7be687c8b92dc6" />
</div>

### Sign to Subscribe

When the approval is done, all you need to do is sign to trigger the subscription process.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FxkRDvN3vYCzilvtiuoBA%252Fimage.png%3Falt=media%26token=a69008a4-472e-4b19-ab94-9a8cb376f428&width=768&dpr=4&quality=100&sign=66516e86289a30a3ea3c7416ccaa03fbb58de51dcd7017693f0148746da98bea" />
</div>

### Error Message

If the user doesn't have enough funds in their wallet, the first debit won't work, and no one will be charged for this action.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FM0NzxDL6pXCCwoIzTGwp%252Fimage.png%3Falt=media%26token=4abba2f8-bca4-4f56-9598-28085922514f&width=768&dpr=4&quality=100&sign=2513e1e80b0da6f0b0d3906e93e6292f16a7c582180a49e98f6432e455c03c8e" />
</div>

### Success

Congratulations! If the transaction is a success, users will be charged from now on. It is possible to get the result thanks to `dataOnSubs`, the function will return the status of the operation and a message if an error happens.
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
<Subs address={"0x8e468E7Cbf7E7E056A7591C796F2dd4C5C255591"} 
        appId="4" 
        chain={"polygon"}
        mode='mainnet'
        apiKey='x123123x'
        ? color='red'
        ? width={200}
        ? defaultPayment='30Days'
        ? choice={"payment", "token"}
        ? dataOnSubs={handleResponse} />
)
```

## How it Works

### Just widget without default payment

```javascript
<Subs address={"0x8e468E7Cbf7E7E056A7591C796F2dd4C5C255591"} 
        appId="4" 
        chain={"polygon"} 
        mode='mainnet'
        dataOnSubs={handleResponse} 
/>
```
<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FNJdz9i9zHd9ZynHcYDvg%252Fimage.png%3Falt=media%26token=773d4d42-c558-4386-b2d1-674e8a7f3179&width=768&dpr=4&quality=100&sign=7a0fc1653ebb5938df90f9bc0834a930e55306d97a1502d89cd9c21985296256" />
</div>


### Widget with default payment

```javascript
<Subs address={"0x8e468E7Cbf7E7E056A7591C796F2dd4C5C255591"} 
        appId="4" 
        chain={"polygon"}
        mode='mainnet'
        apiKey='x123123x'
        defaultPayment='30Days'
        dataOnSubs={handleResponse} 
/>
```
<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https:%2F%2Fcdn.gamma.app%2Fzjdxhxryph5dzu7%2Fe4bb8404307b4d618a0eff526d052cb4%2Foriginal%2FCapture-d-ecran-du-2023-09-19-09-10-57.png&width=768&dpr=1&quality=100&sign=2ce127538e30e3d51e8eba0512798feda7e7e93c927325e732aa1ecb8c912475" />
</div>


### Widget with default payment and preselected token 

```javascript
<Subs address={"0x8e468E7Cbf7E7E056A7591C796F2dd4C5C255591"} 
        appId="4" 
        chain={"polygon"}
        mode='mainnet'
        apiKey='x123123x'
        defaultPayment='30Days'
        choice={{
              payment: "30Days",
              token: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
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
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https%3A%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252Fn4U204jUrDnMXvaEU1Rg%252Fimage.png%3Falt%3Dmedia%26token%3Dfaecc038-ff6e-4f13-9b68-9391ae25a5fc&width=768&dpr=4&quality=100&sign=e3a70967&sv=1" />
</div>

### First view of the Popup

First, you need to accept our terms and conditions by checking the check box.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https%3A%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252FHZj7YYLkj8q9HlFjFqml%252Fimage.png%3Falt%3Dmedia%26token%3D7e8f02c2-12d9-47c1-85db-c56c49afaac7&width=768&dpr=1&quality=100&sign=75c940aa&sv=1" />
</div>

### Approval Step

Users will need to approve an amount of token before the subscription. We will later debit the amount with TransferFrom calls periodically.

<div align="center">
<img src="https://docs.subsprotocol.com/~gitbook/image?url=https%3A%2F%2F1911528868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FMi4ivT4S6SjuAElL2Iuo%252Fuploads%252F0GWBtz620YeaN3Ry7lio%252Fimage.png%3Falt%3Dmedia%26token%3D10e72901-a636-4af8-9173-1a5a2cba55f1&width=768&dpr=4&quality=100&sign=4e17a53d&sv=1" style="width:50%;"/>
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
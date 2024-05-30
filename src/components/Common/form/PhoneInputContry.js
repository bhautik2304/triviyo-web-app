"use client"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInputContry = ({ value, onChange }) => {
    return (
        <>
            <label class="form-label">Enter Whatsapp Number</label>
            <PhoneInput
                country={'in'}
                inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                }}
                containerClass='form-control'
                inputStyle={{
                    width: '100%',
                    // height: '100%',
                    borderWidth: 0,
                    fontFamily: 'DM Sans',
                    color: ''
                }}
                dropdownStyle={{
                    // width: '100%'
                }}
                searchStyle={{
                    borderWidth: 0,
                    width: '100%'
                }}
                containerStyle={{
                    margin: 0,
                    paddingLeft: 0.1
                }}
                inputClass='form-control'
                // placeholder='Enter Whatsapp Number'
                value={value}
                onChange={phone => onChange(phone)}
            />
        </>
    )
}

export default PhoneInputContry
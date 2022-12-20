import Card from 'react-credit-cards';
import React from 'react';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils';

import 'react-credit-cards/es/styles-compiled.css';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

export default class App extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        alert('You have finished payment!');
        this.form.reset();
    };

    render() {
        const { name, number, expiry, cvc, focused, formData } = this.state;

        return (
            <Box
                key="Payment"
                sx={{ backgroundColor: '#121212', minHeight: '100vh' }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: '30px',
                            color: 'white',
                        }}
                    >
                        Payment
                    </Typography>
                    <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                    <FormControl
                        ref={(c) => (this.form = c)}
                        onSubmit={this.handleSubmit}
                        sx={{ marginY: 2 }}
                    >
                        <Box>
                            <TextField
                                type="tel"
                                name="number"
                                placeholder="Номер Карты"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                sx={{
                                    width: '290px',
                                    mb: 1,
                                    backgroundColor: 'white',
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type="text"
                                name="name"
                                placeholder="ФИО"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                sx={{
                                    width: '290px',
                                    mb: 1,
                                    backgroundColor: 'white',
                                }}
                            />
                        </Box>
                        <Box>
                            <Box>
                                <TextField
                                    type="tel"
                                    name="expiry"
                                    placeholder="До какого"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    sx={{
                                        width: '290px',
                                        mb: 1,
                                        backgroundColor: 'white',
                                    }}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    sx={{
                                        width: '290px',
                                        mb: 1,
                                        backgroundColor: 'white',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                sx={{
                                    width: '290px',
                                    mb: 1,
                                    backgroundColor: '#0c6',
                                    color: 'black',
                                    backgroundColor: 'white',
                                }}
                            >
                                Buy
                            </Button>
                        </Box>
                    </FormControl>
                    {formData && (
                        <Box>
                            {formatFormData(formData).map((d, i) => (
                                <Box key={i}>{d}</Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }
}

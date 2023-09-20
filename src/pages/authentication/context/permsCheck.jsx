import { useState } from 'react';
import { getUser } from '../helper/token';

const permsCheck = (permissionNames) => {
    const permissions = JSON.parse(getUser())?.permissions;

    if (!permissions || !Array.isArray(permissionNames)) {
        return false; // Повертаємо false, якщо немає дозволів або передано невірний аргумент
    }

    for (const permissionName of permissionNames) {
        if (permissions[permissionName]) {
            return true; // Якщо хоча б один із дозволів є, то повертаємо true
        }
    }

    return false; // Якщо жоден з дозволів не був знайдений, то повертаємо false
};

export default permsCheck;

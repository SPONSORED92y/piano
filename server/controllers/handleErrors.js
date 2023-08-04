exports.loginErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', password: '' };
    // incorrect username
    if (err.message === 'incorrect username') {
        errors.password = '不存在此帳號';
    }
    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = '密碼錯誤';
    }
    return errors
}
exports.signupErrors = (err) => {
    console.log(err.message, err.code);
    const message = err.message
    let list = []
    let errors = { username: '', password: '', email: '', department: '', studentID: '', role: '', adminKey: '' };
    if (message === 'Invalid AdminKey') {
        errors.adminKey = '通關密語錯誤'
        return errors
    }
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
    let start = 'User validation failed: '.length
    let end = 'User validation failed: '.length
    for (; end < message.length; end++) {
        if (message[end] === ',') {
            list.push(message.substring(start, end))
            start = end + 2
        }
    } if (end !== 'User validation failed: '.length) {
        list.push(message.substring(start, end))
    }
    list.map((mes) => {
        //User validation failed: email: email is empty
        if (mes === 'email: email is empty') {
            errors.email = 'email不得為空白';
        }
        //User validation failed: email: please enter a valid email
        if (mes === 'email: please enter a valid email') {
            errors.email = '不是一個email';
        }
        //User validation failed: username: username is empty
        if (mes === 'username: username is empty') {
            errors.username = '姓名不得為空白';
        }
        //Minimum password length is 6 characters
        if (mes === 'password: Minimum password length is 6 characters') {
            errors.password = '密碼至少需6位';
        }

        //User validation failed: password: password is empty
        if (mes === 'password: password is empty') {
            errors.password = '密碼不得為空白';
        }
        //User validation failed: department: department is empty
        if (mes === 'department: department is empty') {
            errors.department = '系級不得為空白';
        }
        //User validation failed: studentID: studentID is empty
        if (mes === 'studentID: studentID is empty') {
            errors.studentID = '學號不得為空白';
        }
        //User validation failed: role: role is empty
        if (mes === 'role: role is empty') {
            errors.role = '身分不得為空白';
        }
    })
    return errors;
}
exports.createErrors = (err) => {
    console.log(err.message, err.code);
    const message = err.message
    let list = []
    let errors = { title: '', status: '', borrower: '' };
    // duplicate title error
    if (err.code === 11000) {
        errors.title = '已存在該樂譜';
        return errors;
    }
    let start = 'Book validation failed: '.length
    let end = 'Book validation failed: '.length
    for (; end < message.length; end++) {
        if (message[end] === ',') {
            list.push(message.substring(start, end))
            start = end + 2
        }
    } if (end !== 'Book validation failed: '.length) {
        list.push(message.substring(start, end))
    }
    list.map((mes) => {
        if (mes.substring(0, 'status: '.length) === 'status: ') {
            if (mes === 'status: status is empty') {
                errors.status = '狀態不得為空白'
            } else {
                errors.status = '請輸入正確的狀態'
            }
        }
        //Book validation failed: title: title is empty
        if (mes === 'title: username is empty') {
            errors.title = '標題不得為空白';
        }
    })
    return errors;
}
exports.profileErrors = (err) => {
    console.log(err.message, err.code);
    const message = err.message
    let list = []
    let errors = { username: '', email: '', department: '', studentID: '', role: '', adminKey: '' };
    if (message === 'Invalid AdminKey') {
        errors.adminKey = '通關密語錯誤'
        return errors
    }
    // duplicate email error
    if (err.code === 11000) {
        errors.email = '該Email已被使用';
        return errors;
    }
    let start = 'validation failed: '.length
    let end = 'validation failed: '.length
    for (; end < message.length; end++) {
        if (message[end] === ',') {
            list.push(message.substring(start, end))
            start = end + 2
        }
    } if (end !== 'User validation failed: '.length) {
        list.push(message.substring(start, end))
    }
    list.map((mes) => {
        //User validation failed: username: username is empty
        if (mes === 'username: username is empty') {
            errors.username = '姓名不得為空白';
        }
        //User validation failed: email: email is empty
        if (mes === 'email: email is empty') {
            errors.email = 'email不得為空白';
        }
        //User validation failed: email: please enter a valid email
        if (mes === 'email: please enter a valid email') {
            errors.email = '不是一個email';
        }
        //User validation failed: department: department is empty
        if (mes === 'department: department is empty') {
            errors.department = '系級不得為空白';
        }
        //User validation failed: studentID: studentID is empty
        if (mes === 'studentID: studentID is empty') {
            errors.studentID = '學號不得為空白';
        }
        //User validation failed: role: role is empty
        if (mes === 'role: role is empty') {
            errors.role = '身分不得為空白';
        }
    })
    return errors;
}
exports.changePasswordErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { passwordCurrent: '', password: '' };
    // login error
    if (err.message === 'incorrect password') {
        errors.passwordCurrent = '現在密碼錯誤';
        return errors
    }
    //update error
    let start = 'User validation failed: '.length
    let end = 'User validation failed: '.length
    for (; end < message.length; end++) {
        if (message[end] === ',') {
            list.push(message.substring(start, end))
            start = end + 2
        }
    } if (end !== 'User validation failed: '.length) {
        list.push(message.substring(start, end))
    }
    list.map((mes) => {
        //Minimum password length is 6 characters
        if (mes === 'password: Minimum password length is 6 characters') {
            errors.password = '新密碼至少需6位';
        }
        //User validation failed: password: password is empty
        if (mes === 'password: password is empty') {
            errors.password = '新密碼不得為空白';
        }
    })
    return errors
}
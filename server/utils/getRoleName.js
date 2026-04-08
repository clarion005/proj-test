const Role = {
    manager: 0,
    server: 1,
    crew: 2
}

export default function getRoleName(value) {
    return Object.keys(Role).find(key => Role[key] == value)
}
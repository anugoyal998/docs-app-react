const jwtAccessSecret = process.env.JWT_ACCESS_SECRET || "c43b56488e74e6097c4e4171b6baa131e86f3d9ef47fb257c3a032d39c6aa50b"
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || "35f166f8343a9e6d466f7120277defda4231708e84e8c8d22065c3ae22bae4c6"
module.exports = {
    jwtAccessSecret,
    jwtRefreshSecret
}
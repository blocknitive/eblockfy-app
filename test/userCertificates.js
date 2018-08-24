var UserCertificates = artifacts.require("./UserCertificates.sol");

contract("Testing del contrato de almacenamiento de certificados", async (accounts) => {
    
    it("Probando si otra cuenta puede modificar el propietario del contrato", async () => {
        let instance = await UserCertificates.deployed();
        var e;
        try {
            await instance.setOwner.call(accounts[1] ,{from : accounts[1]});
        }
        catch (error){
            e = error;
        }
        assert.notEqual(e,null);
    });
    it("Probando si una cuenta sin permisos puede guardar un certificado", async () => {
        let instance = await UserCertificates.deployed();
        try {
            await instance.addCertificate.call(0x1, accounts[0], {from : accounts[0]});
        }
        catch (error){
            console.log("Segundo test no pasa");
            assert.notEqual(error,null);
        }
    });
    it("Probando si una cuenta sin permisos puede ver un certificado", async () => {
        let instance = await UserCertificates.deployed();
        try {
            await instance.getCertificate.call(0x0, {from : accounts[0]});
        }
        catch (error){
            console.log("Tercer test no pasa");
            assert.notEqual(error,null);
        }
    });
});

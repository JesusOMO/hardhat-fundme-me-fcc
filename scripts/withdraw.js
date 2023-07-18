const { getNamedAccounts, deployments, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const getFundMe = await deployments.get("FundMe")
    const fundMe = await ethers.getContractAt(getFundMe.abi, getFundMe.address)
    console.log("Funding...")
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log("Got it back.")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

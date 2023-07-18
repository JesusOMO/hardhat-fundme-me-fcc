const { getNamedAccounts, ethers, deployments, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundME", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.parseEther("1")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              getFundMe = await deployments.get("FundMe")
              fundMe = await ethers.getContractAt(
                  getFundMe.abi,
                  getFundMe.address
              )
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await ethers.provider.getBalance(
                  fundMe.target
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })

// SPDX-License-Identifier: GPL-2.0-or-later OR MIT
pragma solidity >=0.7.0 <0.9.0;

contract FNFT {
    uint256 constant chainId = 4; // for Goerli test net. Change it to suit your network.
    mapping(uint256 => bool) private usedNounces;
    mapping(uint256 => mapping(address => uint256)) owners; // fraction smart contract[user_address] -> amount in numbers of shares
    address owner;
    struct Fnft {
        string name;
        uint256 id;
        string symbol;
        string description;
    }

    constructor() {
        owner = msg.sender;
    }

    string private constant FNFT_TYPE =
        "Fnft(string name,uint256 id,string symbol,string description)";
    string private constant EIP712_DOMAIN =
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";

    bytes32 private constant EIP712_DOMAIN_TYPEHASH =
        keccak256(abi.encodePacked(EIP712_DOMAIN));
    bytes32 private constant FNFT_TYPEHASH =
        keccak256(abi.encodePacked(FNFT_TYPE));

    // type hashes. Hash of the following strings:
    // 1. EIP712 Domain separator.
    // 2. string describing identity type
    // 3. string describing message type (enclosed identity type description included in the string)
    address constant verifyingContract =
        0x0F990Ef7eC160f01AF7148B74CC8a86FE46c551e;

    bytes32 private constant DOMAIN_SEPARATOR =
        keccak256(
            abi.encode(
                EIP712_DOMAIN_TYPEHASH,
                keccak256("FractionGrid"),
                keccak256("1"),
                chainId,
                verifyingContract
            )
        );


    function hashFnft(Fnft memory fnft) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    DOMAIN_SEPARATOR,
                    keccak256(
                        abi.encode(
                            FNFT_TYPEHASH,
                            keccak256(bytes(fnft.name)),
                            fnft.id,
                            keccak256(bytes(fnft.symbol)),
                            keccak256(bytes(fnft.description))
                        )
                    )
                )
            );
    }



    event TransactionVerified(
        address userAddress,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 c,
        bool verified,
        address calculatedAddress
    );

    function verify2(
        address signer,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public returns (address) {
        Fnft memory fnft = Fnft({
            name: "FractionNFT",
            id: 1000,
            symbol: "FNFT",
            description: "The best Fraction FNT"
        });

        address signerAddress = ecrecover(hashFnft(fnft), sigV, sigR, sigS);
        bool res = signer == signerAddress;

        emit TransactionVerified(
            signer,
            hashFnft(fnft),
            sigR,
            sigS,
            res,
            signerAddress
        );
        return signerAddress;
    }

    // functions to generate hash representation of the struct objects

    function acquireFnft(
        //uint256 tokenFractionAddress,
        uint256 nounce //bytes memory signature
    ) public {
        require(!usedNounces[nounce]);
        usedNounces[nounce] = true;
    }
}

}

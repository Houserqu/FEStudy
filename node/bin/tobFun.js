function contractAction(contractNO, options) {
  if(options.delete) {
    const isLike = options.like
    console.log(`
delete from jfrp_front.\`t_contract_acct_info\` where FContractNO ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp_front.\`t_wholesale_contract_revision\` where FContractID ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp_front.\`t_wholesale_contract\` where FContractID ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp_front.\`t_wholesale_contract_product\` where FContractNO ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp.\`t_contract_acct_info\` where FContractNO ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp.\`t_wholesale_contract\` where FContractID ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp.\`t_wholesale_contract_product\` where FContractNO ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp.\`t_tob_bill\` where FContractNO ${isLike ? 'like' : '='} '${contractNO}';
delete from jfrp.\`t_ns_product_info\` where FContractNO ${isLike ? 'like' : '='} '${contractNO}';
`)
  }
}


module.exports = {
  contractAction
}
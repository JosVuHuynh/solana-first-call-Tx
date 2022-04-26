use anchor_lang::prelude::*;

declare_id!("3dVTBPaADCVUGtDLRMitEdrj86YQLwVHVdsBvJRTn3PD");

#[program]
pub mod hello_w {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

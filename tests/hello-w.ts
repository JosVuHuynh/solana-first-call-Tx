import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { HelloW } from "../target/types/hello_w";

describe("hello-w", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloW as Program<HelloW>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
